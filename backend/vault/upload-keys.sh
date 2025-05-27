#!/bin/sh

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
KEYS_DIR="$SCRIPT_DIR/keys"

echo "[vault-dev-init] Starting script for dev mode..."

export VAULT_ADDR='http://127.0.0.1:8200'
export VAULT_TOKEN='myroot'

echo "[vault-dev-init] Waiting for Vault to respond..."
until vault status >/dev/null 2>&1; do
  echo "[vault-dev-init] Still waiting..."
  sleep 2
done

echo "[vault-dev-init] Vault is ready. Uploading JWT keys..."

vault kv put secret/backend/jwt \
  private_key="$(cat "$KEYS_DIR/private_key.pem")" \
  public_key="$(cat "$KEYS_DIR/public_key.pem")"

if [ $? -eq 0 ]; then
  echo "[vault-dev-init] JWT keys uploaded successfully."
else
  echo "[vault-dev-init] Failed to upload JWT keys."
  exit 1
fi

echo "[vault-dev-init] Uploading HMAC secret..."

vault kv put secret/backend/hmac-secret key=$(openssl rand -base64 32)

if [ $? -eq 0 ]; then
  echo "[vault-dev-init] HMAC secret uploaded successfully."
else
  echo "[vault-dev-init] Failed to upload HMAC secret."
  exit 1
fi
