import envConfig from '@/configs/environments';
import {useRouter} from 'next/router';
import Image from 'next/image';

const ImagePage = ({imageName}: any) => {
  if (!imageName) return null; // Handle missing image data gracefully

  // Assuming image data is in a suitable format (e.g., URL)
  const imageSrc = `${envConfig.api}image/${imageName}`;

  return (
    <div>
      <h1>{imageName}</h1>
      {imageSrc != 'img' ? (
        <Image
          src={imageSrc}
          alt={imageName}
          // Include other Next.js Image component properties as needed
          layout="fill" // Adjust layout as desired
          objectFit="cover" // Adjust object fit as desired
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export async function getServerSideProps({params}: any) {
  const imageName = params.imageName;

  try {
    // No need to fetch images list here
    // ... const res = await (await fetch(`${envConfig.api}image/images`)).json();

    return {props: {imageName}}; // Pass the image name for rendering
  } catch (error) {
    console.error('Error fetching image:', error);
    return {notFound: true}; // Handle image not found gracefully
  }
}

export default ImagePage;
