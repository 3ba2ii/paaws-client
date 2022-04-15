import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Confetti from 'react-confetti';
import { Layout } from '../components/Layout';

const Home: NextPage = () => {
  const router = useRouter();
  const { ref } = router.query;

  const isFireworks =
    ref === '/register/complete-info?success=true' &&
    localStorage.getItem('completed-info-confetti');
  return (
    <Layout>
      {isFireworks && (
        <Confetti
          numberOfPieces={600}
          recycle={false}
          onConfettiComplete={() => {
            localStorage.removeItem('completed-info-confetti');
          }}
        />
      )}
    </Layout>
  );
};

export default Home;
