.PHONY: help up down logs build clean keys setup

# Cores para o terminal
GREEN=\033[0;32m
NC=\033[0m # No Color

help: ## Mostra os comandos disponíveis
	@echo "Comandos disponíveis no WeatherStack:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  ${GREEN}%-15s${NC} %s\n", $$1, $$2}'

setup: ## Cria o arquivo .env baseado no exemplo
	@cp .env.example .env
	@echo "${GREEN}Arquivo .env criado! Configure suas variáveis agora.${NC}"

keys: ## Gera chaves RSA Base64 para JWT (Linux/Mac/WSL)
	@echo "Gerando par de chaves RSA..."
	@openssl genrsa -out private_temp.key 2048 > /dev/null 2>&1
	@openssl rsa -in private_temp.key -pubout -out public_temp.key > /dev/null 2>&1
	@echo ""
	@echo "${GREEN}=== JWT_PRIVATE_KEY_BASE64 ===${NC}"
	@if [ "$$(uname)" = "Darwin" ]; then base64 -i private_temp.key; else base64 -w 0 private_temp.key; fi
	@echo ""
	@echo ""
	@echo "${GREEN}=== JWT_PUBLIC_KEY_BASE64 ===${NC}"
	@if [ "$$(uname)" = "Darwin" ]; then base64 -i public_temp.key; else base64 -w 0 public_temp.key; fi
	@echo ""
	@echo "Copie os valores acima para o seu arquivo .env"
	@rm private_temp.key public_temp.key

up: ## Sobe todos os containers em background
	@echo "Subindo containers..."
	docker compose up -d --build
	@echo "${GREEN}Aplicação rodando! Acesse http://localhost:5173${NC}"

down: ## Para e remove todos os containers
	@echo "Parando containers..."
	docker compose down

logs: ## Exibe os logs de todos os serviços
	docker compose logs -f

logs-api: ## Logs apenas da API
	docker compose logs -f api

logs-worker: ## Logs apenas do Worker
	docker compose logs -f worker

clean: ## Remove containers, volumes e imagens (Reset total)
	@echo "Limpando tudo..."
	docker compose down -v --rmi all --remove-orphans
	@echo "${GREEN}Ambiente limpo.${NC}"