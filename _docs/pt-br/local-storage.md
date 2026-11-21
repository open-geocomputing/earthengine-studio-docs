---
title: Armazenamento local
description: Mantenha os scripts em disco, conecte o Google, use o Git opcional e recupere o acesso à pasta.
permalink: /pt-br/local-storage/
order: 13
lang: pt-br
translation_key: local-storage
keywords: [local, armazenamento, pastas, Git, cofre, Google, offline]
translated_from: d19f26c621aa
---

## Comece com uma pasta local

1. Use um navegador Chromium para desktop (Chrome ou Edge) no site HTTPS do Studio.
2. Escolha **Local** na caixa de diálogo inicial e conceda acesso de leitura e gravação a uma pasta, convencionalmente chamada `Earthengine`. Cancelar mantém o seletor aberto; selecione uma pasta ou escolha **Online**.
3. Em **Scripts → Local folders**, crie uma pasta de projeto ou expanda uma subpasta direta existente da pasta selecionada. Abra um arquivo, edite-o e salve em disco. O login no Git e no Google não é necessário para editar arquivos locais.
4. Use **Settings → Workspace modes** para reconectar ou alterar a pasta, configurar o ID do projeto do Earth Engine e o autor do Git, ou habilitar **Hosted services** junto com **Local folders**. O modo preferido controla os novos rascunhos; os arquivos existentes são salvos em sua origem original. Trocar de modo não move arquivos.

## Conecte o Earth Engine

O armazenamento local mantém os arquivos no seu computador; a computação do Earth Engine ainda precisa de acesso à internet e de um projeto autorizado do Google Cloud. Clique em **Sign in** ou **Connect Google and remember** e autorize na janela do Google. Nenhum terminal nem senha de cofre é necessário para uma conexão criada pelo navegador. O projeto padrão do Earth Engine é selecionado quando disponível, a menos que você já tenha salvo uma escolha. Use o seletor de projeto da barra superior para trocar de projeto; se a descoberta falhar, informe o ID do projeto em Workspace modes. A verificação pode levar até um minuto. Após uma falha de acesso, o seletor continua disponível para outro projeto ou para uma nova tentativa.

Quando um serviço de autenticação está configurado, o Studio salva uma concessão criptografada pelo servidor e vinculada à origem em `.earthengine.studio/google-connection.json`. Ela é restaurada automaticamente depois que a permissão da pasta estiver disponível. O serviço troca e renova as credenciais sem armazenar um registro de credencial do usuário; os tokens de acesso ficam na memória. Trate a concessão salva como uma credencial e mantenha a pasta privada. **Remove saved Google connection** exclui a cópia local, mas não revoga a concessão do Google nem remove backups. O login explícito reabre o consentimento; a renovação automática não. A permissão opcional somente leitura de Monitoring habilita o uso mensal quando disponível; um indicador oculto não significa uso zero nem falha de acesso ao Earth Engine.

Em uma implantação estática sem o serviço de autenticação, o login do Google no navegador precisa de reautorização ocasional. O administrador da implantação configura o ID de cliente OAuth. Quando Hosted services está habilitado, a autenticação hospedada fornece a sessão compartilhada do Earth Engine; desabilite-o para usar a conexão local.

## Arquivos, Git e downloads

Cada projeto é uma pasta filha, por exemplo `Earthengine/project-a/main.js`. As configurações privadas e as credenciais ficam em `Earthengine/.earthengine.studio/`. Scripts mostra por padrão arquivos JavaScript, Python, Markdown e sem extensão; **Show all file types** revela os demais arquivos. Dotfiles (exceto `.gitignore`), pastas iniciadas por ponto e diretórios `__name__` permanecem ocultos.

O `require()` relativo do JavaScript e as importações do Python funcionam dentro dos projetos. `require('lh:project-b/module.js')` carrega outro projeto do mesmo espaço de trabalho. Salvar não faz commit. Para usar o Git opcional, expanda o projeto e abra o botão de branch dele e, se necessário, escolha **Initialize Git**. Informe um caminho para **stage**/**unstage**, uma mensagem para **commit** ou um nome para **branch**/**checkout**. Defina o nome e o e-mail do autor do Git em Workspace modes. **status**, **diff**, **log** e **branches** inspecionam o repositório. O checkout exige uma árvore de trabalho limpa, incluindo arquivos não rastreados.

Use o Git de desktop para clone, pull, push, conflitos, submódulos e worktrees vinculados. Não execute o Git de desktop ao mesmo tempo que as operações Git do Studio. O Git no navegador oferece suporte a repositórios comuns de até 20.000 arquivos, 128 MiB incluindo o histórico e 40 níveis de diretório. Mantenha saídas grandes fora dos projetos. Os downloads para pasta usam por padrão `downloads/<description>` dentro do espaço de trabalho. Mantenha a aba do navegador aberta até a conclusão.

## Reabra, faça backup e recupere

Use **Reconnect folder** se a permissão expirar, ou escolha a pasta original novamente. Limpar os dados do site pode fazer o navegador esquecer o handle da pasta, mas não exclui os arquivos do disco. Faça backup dos arquivos de projeto de forma independente; os rascunhos não salvos usam o armazenamento de recuperação do navegador. Se outro aplicativo alterar um arquivo, preserve suas edições não salvas antes de aceitar o recarregamento.

O cofre opcional armazena segredos nomeados ou credenciais avançadas importadas do Google. Escolha **Unlock or create vault** com uma senha-frase de pelo menos 12 caracteres; o preenchimento automático de gerenciadores de senhas é compatível. O cofre é bloqueado ao recarregar ou ao desconectar. As credenciais importadas exigem desbloqueio após a reinicialização; as conexões do Google criadas pelo navegador, não. O Studio não consegue recuperar uma senha-frase esquecida.

Não faça commit nem compartilhe `.earthengine.studio/`. Se o Git informar uma transação interrompida, preserve o diário de recuperação e os backups antes de usar o Git de desktop para recuperar. O [guia de recuperação do repositório](https://github.com/open-geocomputing/earthengine-studio-editor/blob/master/LOCAL_WORKSPACE.md#recovery) descreve o procedimento. Os snippets hospedados e o provisionamento de Apps gerenciados exigem Hosted services; o modo local não torna esses serviços disponíveis offline.
