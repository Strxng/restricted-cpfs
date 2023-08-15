### Restricted Cpfs

O projeto foi meticulosamente desenvolvido com a aplicação estrita dos princípios do SOLID e do Clean Architecture, garantindo uma arquitetura robusta e de alta qualidade.

Para executar a aplicação em ambiente local, foi preparado um arquivo denominado "start.sh". Para inicializar o projeto, basta executar o comando "sh start.sh" a partir do diretório raiz do projeto (É imprescindível ter o Docker instalado).

Além disso, acompanha a API uma documentação detalhada dos endpoints, acessível através da rota "/documentation".

Optei por desenvolver o projeto em Node.js puro, pois essa abordagem ressalta de maneira mais evidente o conhecimento aprofundado sobre a estrutura de aplicações. Embora minha stack principal envolva o uso do NestJs, optei por uma abordagem que dispensa frameworks, visando demonstrar de forma concreta os conceitos subjacentes ao SOLID e à Clean Architecture. Vale ressaltar que o NestJs já incorpora esses conceitos de forma integrada.

A seleção do banco de dados PostgreSQL se deve, em grande parte, à sua ampla utilização em meus projetos de menor escala. Contudo, considerando que empreguei o TypeORM para lidar com a camada de persistência, a troca do banco de dados se torna uma tarefa simplificada, caso necessário. As alterações envolveriam passos como a instalação do driver do novo banco, ajustes no plugin do TypeORM e modificações nas migrações.

Em relação aos testes, minha escolha recaiu sobre o Vitest devido à sua integração com o esbuild, conferindo-lhe um desempenho excepcional, tornando-o uma das bibliotecas de teste mais eficientes da atualidade. Além disso, o Vitest adota os padrões do Jest, o que mantém a sintaxe dos códigos de teste similar àquela da biblioteca Jest, que foi minha ferramenta de aprendizado para testes.
