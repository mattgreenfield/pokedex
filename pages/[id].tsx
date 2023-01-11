import Head from 'next/head';
import { useRouter } from 'next/router';
import { DetailsModal } from '../components/DetailsModal';

const Details = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Pokédex</title>
        <meta name='description' content='A summary of a given Pokemon' />
      </Head>
      {id && <DetailsModal id={id} />}
    </>
  );
};

export default Details;
