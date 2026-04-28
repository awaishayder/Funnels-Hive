import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main(){
  const workspace = await prisma.workspace.create({data:{name:'Demo Agency'}});
  await prisma.lead.createMany({data:[
    {workspaceId:workspace.id,name:'Bright Dental',niche:'Dentist',city:'Dubai',source:'google',rating:3.8,email:'owner@brightdental.ae'},
    {workspaceId:workspace.id,name:'FitCore Gym',niche:'Fitness',city:'Austin',source:'yelp',rating:4.1}
  ]});
}
main().finally(()=>prisma.$disconnect());
