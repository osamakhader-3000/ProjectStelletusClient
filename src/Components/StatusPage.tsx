import StatusTable from './StatusTable.tsx'

interface StatusesPageProps {
  realmid: number;
}

export default function StatusesPage({ realmid }: StatusesPageProps) {
  return (
    <div className='statustablecontainer'>        
      <StatusTable realmid={realmid}/>
    </div>    
  );
}