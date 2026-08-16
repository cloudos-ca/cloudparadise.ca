#!/usr/bin/env bash
# `npm ci` avec réessais. Le DNS des runners lâche par intermittence (« getaddrinfo EAI_AGAIN ») :
# les `fetch-retries` de npm ne couvrent que les échecs HTTP, pas une résolution qui échoue avant
# qu'une requête parte. Sans ce filet, des jobs tombent en rouge sur un code parfaitement sain.
set -euo pipefail

attempts=${NPM_CI_ATTEMPTS:-5}
delay=${NPM_CI_DELAY:-15}

n=0
until npm ci "$@"; do
  n=$((n + 1))
  if [ "$n" -ge "$attempts" ]; then
    echo "npm ci a échoué après $n tentatives" >&2
    exit 1
  fi
  npm cache verify > /dev/null 2>&1 || true
  echo "tentative $n de npm ci échouée (probablement le DNS du runner) ; nouvel essai dans ${delay}s..."
  sleep "$delay"
done
