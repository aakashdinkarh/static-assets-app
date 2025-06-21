type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  alt: string;
};

export function Image(props: ImageProps) {
  const { alt, loading = 'lazy', ...rest } = props;

  return <img loading={loading} alt={alt} {...rest} />;
}
