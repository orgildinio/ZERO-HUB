import {
  db,
  eq
} from '@zerohub/database/db';

import {
  tenants
} from '@zerohub/database/schema';

export default async function Home() {

  const data = await db
    .select()
    .from(tenants)
    .where(eq(tenants.slug, 'cactus'));

  return (
    <div>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
