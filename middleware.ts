import {NextApiRequest, NextApiResponse} from 'next';

const handleImageRequest = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const {slug} = req.query;
  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${slug}`;
  res.redirect(imageUrl);
};

export default handleImageRequest;
