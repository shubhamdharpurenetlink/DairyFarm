/**
 * Curated, verified Unsplash photo IDs grouped by visual theme.
 * Used as dummy media until real product/farm photos are uploaded.
 *
 * To replace with real assets later, just swap the URLs returned by
 * `dummyImage(...)` — every seed file routes through this helper.
 */

const POOLS = {
  milk: [
    "photo-1563636619-e9143da7973b",
    "photo-1550583724-b2692b85b150",
    "photo-1559598467-f8b76c8155d0",
  ],
  ghee: [
    "photo-1631452180519-c014fe946bc7",
    "photo-1574484284002-952d92456975",
    "photo-1604152135912-04a022e23696",
  ],
  curd: [
    "photo-1488477181946-6428a0291777",
    "photo-1578020190125-f4f7c18bc9cb",
    "photo-1505252585461-04db1eb84625",
  ],
  paneer: [
    "photo-1589881133595-a3c085cb731d",
    "photo-1486297678162-eb2a19b0a32d",
    "photo-1628088062854-d1870b4553da",
  ],
  butter: ["photo-1589985270826-4b7bb135bc9d"],
  mava: [
    "photo-1604152135912-04a022e23696",
    "photo-1578020190125-f4f7c18bc9cb",
  ],
  sweets: [
    "photo-1565299543923-37dd37887442",
    "photo-1604152135912-04a022e23696",
  ],
  cow: [
    "photo-1546445317-29f4545e9d53",
    "photo-1500595046743-cd271d694d30",
    "photo-1465379944081-7f47de8d74ac",
  ],
  farm: [
    "photo-1500595046743-cd271d694d30",
    "photo-1500382017468-9049fed747ef",
    "photo-1464226184884-fa280b87c399",
    "photo-1605000797499-95a51c5269ae",
    "photo-1500076656116-558758c991c1",
  ],
  nature: [
    "photo-1500382017468-9049fed747ef",
    "photo-1464226184884-fa280b87c399",
    "photo-1500076656116-558758c991c1",
  ],
  training: [
    "photo-1551836022-d5d88e9218df",
    "photo-1486325212027-8081e485255e",
    "photo-1517245386807-bb43f82c33c4",
  ],
  health: [
    "photo-1576091160550-2173dba999ef",
    "photo-1471864190281-a93a3070b6de",
    "photo-1559757175-5700dde675bc",
  ],
  team: [
    "photo-1535713875002-d1d0cf377fde",
    "photo-1573496359142-b8d87734a5a2",
    "photo-1438761681033-6461ffad8d80",
    "photo-1500648767791-00dcc994a43e",
  ],
  facility: [
    "photo-1574943320219-553eb213f72d",
    "photo-1500382017468-9049fed747ef",
    "photo-1464226184884-fa280b87c399",
  ],
  award: [
    "photo-1567427018141-0584cfcbf1b8",
    "photo-1604079628040-94301bb21b91",
  ],
} as const;

export type DummyImageCategory = keyof typeof POOLS;

const stableHash = (seed: string) => {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return Math.abs(h);
};

export function dummyImage(
  category: DummyImageCategory,
  seed: string,
  w = 800,
  h = 800,
): string {
  const pool = POOLS[category];
  const photoId = pool[stableHash(seed) % pool.length];
  return `https://images.unsplash.com/${photoId}?w=${w}&h=${h}&fit=crop&auto=format&q=75`;
}

/** Pick the i-th photo from the pool (deterministic). Useful for galleries. */
export function dummyImageAt(
  category: DummyImageCategory,
  index: number,
  w = 800,
  h = 800,
): string {
  const pool = POOLS[category];
  const photoId = pool[((index % pool.length) + pool.length) % pool.length];
  return `https://images.unsplash.com/${photoId}?w=${w}&h=${h}&fit=crop&auto=format&q=75`;
}
