import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import AddLetterForm from '@/components/AddLetterForm';

const styles = {
  main: {
    backgroundColor: '#fff8e6',
  },
};

const AddLetter = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  return (
    <main style={styles.main}>
      <AddLetterForm />
    </main>
  );
};

export default AddLetter;
