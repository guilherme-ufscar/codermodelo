import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { useRef } from 'react';
import { uploadFile } from '@/lib/api';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Link2,
  Image as ImageIcon, Youtube as YoutubeIcon, List, ListOrdered,
  Heading2, Heading3, AlignLeft, AlignCenter, AlignRight,
  Highlighter, Undo, Redo,
} from 'lucide-react';

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      Image.configure({ allowBase64: true }),
      Youtube.configure({ width: 720, height: 405, nocookie: true }),
      Placeholder.configure({ placeholder: 'Escreva seu artigo aqui...' }),
    ],
    content: content ? JSON.parse(content) : '',
    onUpdate: ({ editor }) => onChange(JSON.stringify(editor.getJSON())),
  });

  if (!editor) return null;

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadFile(file);
    editor!.chain().focus().setImage({ src: url }).run();
    e.target.value = '';
  }

  function insertYoutube() {
    const url = prompt('Cole a URL do YouTube:');
    if (url) editor!.chain().focus().setYoutubeVideo({ src: url }).run();
  }

  function setLink() {
    const url = prompt('URL do link:');
    if (url) editor!.chain().focus().setLink({ href: url }).run();
  }

  const btn = (active: boolean) =>
    `p-2 rounded hover:bg-primary/10 transition-colors ${active ? 'bg-primary/20 text-primary' : 'text-muted-foreground'}`;

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border bg-muted">
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className={btn(false)}><Undo className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className={btn(false)}><Redo className="w-4 h-4" /></button>
        <div className="w-px h-5 bg-border mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(editor.isActive('heading', { level: 2 }))}><Heading2 className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btn(editor.isActive('heading', { level: 3 }))}><Heading3 className="w-4 h-4" /></button>
        <div className="w-px h-5 bg-border mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive('bold'))}><Bold className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive('italic'))}><Italic className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btn(editor.isActive('underline'))}><UnderlineIcon className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={btn(editor.isActive('strike'))}><Strikethrough className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHighlight().run()} className={btn(editor.isActive('highlight'))}><Highlighter className="w-4 h-4" /></button>
        <div className="w-px h-5 bg-border mx-1" />
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={btn(editor.isActive({ textAlign: 'left' }))}><AlignLeft className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={btn(editor.isActive({ textAlign: 'center' }))}><AlignCenter className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={btn(editor.isActive({ textAlign: 'right' }))}><AlignRight className="w-4 h-4" /></button>
        <div className="w-px h-5 bg-border mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive('bulletList'))}><List className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editor.isActive('orderedList'))}><ListOrdered className="w-4 h-4" /></button>
        <div className="w-px h-5 bg-border mx-1" />
        <button type="button" onClick={setLink} className={btn(editor.isActive('link'))}><Link2 className="w-4 h-4" /></button>
        <button type="button" onClick={() => fileInputRef.current?.click()} className={btn(false)}><ImageIcon className="w-4 h-4" /></button>
        <button type="button" onClick={insertYoutube} className={btn(false)}><YoutubeIcon className="w-4 h-4" /></button>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
      </div>

      <EditorContent
        editor={editor}
        className="prose prose-invert max-w-none min-h-[400px] p-6 [&_.ProseMirror]:outline-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_img]:rounded-xl [&_.ProseMirror_iframe]:rounded-xl [&_.ProseMirror_iframe]:w-full"
      />
    </div>
  );
}
