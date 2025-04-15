import { CONFIG } from 'src/config-global';

import { CollectionView } from 'src/sections/dua-collection/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Users - ${CONFIG.appName}`}</title>

      <CollectionView />
    </>
  );
}
