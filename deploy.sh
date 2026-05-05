#!/bin/bash
set -e

APP_NAME="axyr-site"
PORT=10200
REPO_DIR="/www/wwwroot/codermodelo"

echo "==> Entrando no diretório..."
cd "$REPO_DIR"

echo "==> Atualizando código do GitHub..."
git pull origin main

echo "==> Buildando imagem Docker..."
docker build -t "$APP_NAME" .

echo "==> Parando container antigo (se existir)..."
docker stop "$APP_NAME" 2>/dev/null || true
docker rm "$APP_NAME" 2>/dev/null || true

echo "==> Subindo novo container na porta $PORT..."
docker run -d \
  --name "$APP_NAME" \
  --restart always \
  -p "$PORT:80" \
  "$APP_NAME"

echo "==> Deploy concluído! Site rodando em http://localhost:$PORT"
docker ps | grep "$APP_NAME"
