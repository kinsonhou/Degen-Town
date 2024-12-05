import Button from './buttons/Button';
import freezeImg from '/assets/freeze.svg';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function FreezeButton() {
  const freeze = useMutation(api.testing.freeze);
  const resume = useMutation(api.testing.resume);
  const worldStatus = useQuery(api.world.defaultWorldStatus);

  const isFrozen = worldStatus?.status === 'stoppedByDeveloper';

  return (
    <Button
      imgUrl={freezeImg}
      onClick={() => {
        if (isFrozen) {
          resume();
        } else {
          freeze();
        }
      }}
      title={isFrozen ? 'Unfreeze' : 'Freeze'}
    >
      {isFrozen ? 'Unfreeze' : 'Freeze'}
    </Button>
  );
}
