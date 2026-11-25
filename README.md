# Trabalho Brassaria

Projeto escolar de desenvolvimento web para a Brassaria 780 anos. O site reúne informações sobre a marca, um portfólio de bebidas e uma página de eventos. A área administrativa permite cadastrar, editar e excluir categorias, bebidas e eventos após o login.

## Estrutura do projeto

O código fica na pasta `Trabalho-Brassaria/`. A aplicação usa Java 21, Spring Boot e Maven no servidor, MySQL para persistência e HTML, CSS e JavaScript na interface.

| Caminho dentro de `Trabalho-Brassaria/` | Responsabilidade |
| --- | --- |
| `pom.xml` | Define a versão do Java, as dependências e a configuração do Maven. |
| `src/main/resources/static/` | Reúne as páginas públicas, a tela de login, o painel administrativo e os arquivos CSS e JavaScript. |
| `src/main/resources/application.properties` | Configura a conexão com o MySQL e a conta administrativa. |
| `src/main/java/br/com/aula/brassaria/` | Contém a classe de inicialização e os pacotes do servidor. |

No pacote Java `br.com.aula.brassaria`, o código é organizado em camadas:

| Pacote | Responsabilidade |
| --- | --- |
| `controller` | Recebe as requisições HTTP para bebidas, categorias, eventos e conteúdo institucional. |
| `service` | Implementa a lógica usada pelos controladores. |
| `repository` | Consulta e grava dados no MySQL usando Spring Data JPA. |
| `model` | Mapeia as entidades persistidas. Cada bebida pertence a uma categoria. |
| `dto` | Define os dados trocados pela API. |
| `config` | Configura o login e protege o painel e as operações de cadastro, edição e exclusão com Spring Security. |

Ao abrir o portfólio, o JavaScript consulta a API de bebidas e agrupa os itens pelo nome da categoria retornado pela API. No painel, um administrador pode cadastrar uma categoria e associá-la a uma bebida. O servidor grava as alterações no banco, e o portfólio consulta os dados atualizados quando a página é recarregada.

## Como executar localmente

1. Instale o JDK 21 e inicie uma instância do MySQL.
2. Na pasta `Trabalho-Brassaria/`, ajuste `spring.datasource.url`, `spring.datasource.username` e `spring.datasource.password` em `src/main/resources/application.properties` conforme sua instância. A configuração padrão usa `localhost:3306` e o banco `brassaria`. Para criar o banco automaticamente, a conta do MySQL precisa ter permissão para isso.
3. Execute o Maven Wrapper na pasta `Trabalho-Brassaria/`.

   ```powershell
   .\mvnw.cmd spring-boot:run
   ```

   No Linux ou macOS, use `./mvnw spring-boot:run`.
4. Abra `http://localhost:8080/`. Para acessar o painel, use `http://localhost:8080/login.html` com o usuário e a senha definidos em `brassaria.admin.usuario` e `brassaria.admin.senha`.
