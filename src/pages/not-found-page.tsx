import '../App.css';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { DefaultLayout } from '../layout/default-layout';

const NotFoundPage: FC = () => {

  return (
    <DefaultLayout>
      <div className='w-full h-screen content-center text-center'>
        <h1 className='text-4xl mb-8'>Sorry, we did not find the page.</h1>
        <Link to="/">Back to Home</Link>
      </div>
    </DefaultLayout>
  )
}

export default NotFoundPage;
