const Photo = ({ image, alt, id }) => {
  return (
    <img
      src={image}
      alt={alt || 'Imagem da galeria'}
      id={id}
    />
  );
};

export default Photo;
