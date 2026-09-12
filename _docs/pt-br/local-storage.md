---
title: Armazenamento local
description: Salvar scripts no disco, conectar o Google e usar Git opcionalmente.
permalink: /pt-br/local-storage/
order: 12
lang: pt-br
translation_key: local-storage
keywords: [local, storage, folders, Git, vault, Google, offline]
---

## Escolher uma pasta

1. Abra o Studio por HTTPS no Chrome ou Edge para computador.
2. Escolha **Local** ao iniciar e conceda leitura e escrita em uma pasta, normalmente `Earthengine`. Se cancelar, selecione uma pasta ou **Online**.
3. Em **Scripts → Local folders**, crie ou abra uma subpasta direta. Abra, edite e salve arquivos no disco sem precisar de Git ou login Google.
4. Em **Settings → Workspace modes**, reconecte a pasta, configure o ID do projeto e o autor Git ou habilite **Hosted services** junto com **Local folders**. O modo preferido vale para novos rascunhos; arquivos existentes mantêm seu destino. A troca de modo não move arquivos.

## Conectar o Earth Engine

Os cálculos ainda precisam de Internet e de um projeto Google Cloud autorizado. Clique em **Sign in** ou **Connect Google and remember**. Não é necessário terminal nem senha do cofre. O projeto padrão do Earth Engine é selecionado quando disponível, salvo uma escolha já salva. Troque pelo seletor superior; se a descoberta falhar, informe o ID em Workspace modes. A verificação pode levar um minuto; após uma falha, o seletor permanece disponível.

Com o serviço de autenticação, o Studio salva uma autorização criptografada pelo servidor e vinculada à origem em `.earthengine.studio/google-connection.json`. Ela é restaurada quando a pasta fica acessível. O serviço renova credenciais sem armazenar um registro de credenciais do usuário; tokens de acesso ficam na memória. Mantenha a pasta privada. **Remove saved Google connection** exclui a cópia local sem revogar a autorização Google ou apagar backups. O login explícito reabre o consentimento. Monitoring somente leitura é opcional; indicador oculto não significa consumo zero.

Sem serviço de autenticação, o login do navegador exige nova autorização ocasionalmente. O administrador configura o ID do cliente OAuth. Hosted services ativo fornece a sessão Earth Engine compartilhada; desative-o para usar a conexão local.

## Arquivos, Git e downloads

Projetos ficam diretamente em `Earthengine/`, como `project-a/main.js`; configurações privadas ficam em `.earthengine.studio/`. **Show all file types** revela outras extensões, mas não arquivos ocultos exceto `.gitignore`, pastas com ponto ou diretórios `__name__`. Imports relativos de Python e `require()` de JavaScript funcionam; `require('lh:project-b/module.js')` carrega outro projeto do mesmo espaço.

Salvar não cria um commit. Abra o botão de branch do projeto expandido e, se necessário, **Initialize Git**. Informe um caminho para **stage**/**unstage**, uma mensagem para **commit**, um nome para **branch**/**checkout**. Configure o autor em Workspace modes. **status**, **diff**, **log** e **branches** inspecionam o repositório. Checkout exige árvore limpa, inclusive arquivos não rastreados.

Use Git no computador para clone, pull, push, conflitos, submódulos e worktrees vinculados, sem operações simultâneas. Git no navegador aceita 20.000 arquivos, 128 MiB com histórico e 40 níveis. Downloads usam `downloads/<description>` por padrão; mantenha a aba aberta e resultados grandes fora dos projetos.

## Recuperação e cofre opcional

Use **Reconnect folder** se a permissão expirar. Limpar dados do site pode esquecer a pasta, mas não apaga arquivos. Faça backups independentes; rascunhos não salvos dependem da recuperação do navegador. Preserve suas edições antes de recarregar arquivos alterados externamente.

**Unlock or create vault** requer pelo menos 12 caracteres e aceita gerenciadores de senhas. O cofre bloqueia ao recarregar ou desconectar a pasta. Credenciais Google importadas pelas opções avançadas exigem desbloqueio após reiniciar; conexões criadas no navegador não. Senhas esquecidas não podem ser recuperadas.

Não compartilhe `.earthengine.studio/`. Em transações Git interrompidas, preserve o diário e backups antes de recuperar com Git no computador. Snippets hospedados e provisionamento de Apps gerenciados precisam de Hosted services.
