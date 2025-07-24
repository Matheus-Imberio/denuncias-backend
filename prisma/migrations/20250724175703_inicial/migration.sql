-- CreateTable
CREATE TABLE "denuncia" (
    "id" UUID NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "descricao" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "denunciante_id" UUID NOT NULL,
    "endereco_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "denuncia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "denunciante" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "denunciante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "endereco" (
    "id" UUID NOT NULL,
    "cep" VARCHAR(9) NOT NULL,
    "logradouro" VARCHAR(100) NOT NULL,
    "numero" VARCHAR(10) NOT NULL,
    "bairro" VARCHAR(50) NOT NULL,
    "cidade" VARCHAR(50) NOT NULL,
    "estado" VARCHAR(50) NOT NULL,
    "pais" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "endereco_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "denunciante_cpf_key" ON "denunciante"("cpf");

-- AddForeignKey
ALTER TABLE "denuncia" ADD CONSTRAINT "denuncia_denunciante_id_fkey" FOREIGN KEY ("denunciante_id") REFERENCES "denunciante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "denuncia" ADD CONSTRAINT "denuncia_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
