Comandos:

    C:\ProgramData\chocolatey\bin

    ./ngrok tcp 5432

Criar Tabela:

    CREATE TABLE funcionarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    nickname VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipoacesso VARCHAR(255) NOT NULL

    );

    ALTER TABLE funcionarios ADD COLUMN "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
    ALTER TABLE funcionarios ADD COLUMN "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
