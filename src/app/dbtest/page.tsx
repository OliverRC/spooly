import { createClient } from '@/utils/supabase/server';

export default async function Page() {
  const supabase = await createClient();
 
  const { data, error } = await supabase.from('filaments').select();

  console.log(data, error);
 
  return (
    <div>
      <div>DB Test</div>

      {error && <div>{error.message}</div>}

      {data?.map((item) => (
        <div key={item.id}>{item.brand}</div>
      ))}
    </div>
  );
}