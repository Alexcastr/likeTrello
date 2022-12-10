interface SeedData {
  entries: SeedEntry[];
}
interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData:SeedData ={
  entries: [
    {
      
      description: 'Pendientes: y the readable content of a page when looking at its layout. The po',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      
      description: 'In-progress: y the readable content of a page when looking at its layout. The po',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      
      description: 'Finished: lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the',
      status: 'finished',
      createdAt: Date.now() - 1000000,
    },
  ]
}