import StatusTable from './StatusTable.tsx'
import styles from './StatusesPage.module.css'

interface StatusesPageProps {
  realmid: number;
}

export default function StatusesPage({ realmid }: StatusesPageProps) {
  return (
    <div className={styles.statustablecontainer}>        
      <StatusTable realmid={realmid}/>
    </div>    
  );
}