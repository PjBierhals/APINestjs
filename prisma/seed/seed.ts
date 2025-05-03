import { PrismaService } from 'src/database/prisma/prisma.service';
import { BcryptService } from 'src/modules/auth/hashing/bcrypt.service';

const prisma = new PrismaService();
const bcryptService = new BcryptService(); // Inicializando o serviço de hashing
enum PERMISSION {
  MASTER = 'MASTER',
}
async function main() {
  console.log('Iniciando o seed...');
  // Criando a seção MasterTI
  const masterSection = await prisma.section.create({
    data: {
      authorId: '', // Será atualizado após a criação do usuário
      description: 'Sessão Master',
    },
  });

  // Criando a posição padrão
  const masterPosition = await prisma.position.create({
    data: {
      authorId: '', // Será atualizado após a criação do usuário
      description: 'Administrador Master',
    },
  });

  //hash no password
  const passwordH = await bcryptService.hash('masterpassword');
  // Criando o usuário MasterTI (autor)
  const masterUser = await prisma.user.create({
    data: {
      email: 'master@master.com',
      password: passwordH, // Utilize hash para senhas em produção
      name: 'Master TI',
      status: true,
      permission: PERMISSION.MASTER,
      positionId: masterPosition.id,
      sectionId: masterSection.id,
    },
  });

  // Atualizando a seção e a posição com o ID do autor
  await prisma.section.update({
    where: { id: masterSection.id },
    data: {
      authorId: masterUser.id,
    },
  });

  await prisma.position.update({
    where: { id: masterPosition.id },
    data: {
      authorId: masterUser.id,
    },
  });

  console.log('Seed concluído com sucesso!');
  console.log({ masterUser, masterPosition, masterSection });
}

main()
  .catch((e) => {
    console.error('Erro ao executar o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
