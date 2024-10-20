import React from "react";
import {
  Box,
  Image,
  Text,
  Heading,
  Link,
  Stack,
  Badge,
} from "@chakra-ui/react";

interface NewsItemProps {
  news: {
    title: string;
    description: string;
    image: string;
    publishedAt: string;
    source: string;
    url: string;
  };
}

function NewsItem({ news }: NewsItemProps) {
  const { title, description, image, publishedAt, source, url } = news;

  return (
    <Box
      maxW="lg"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
    >
      <Image src={image} alt={title} />

      <Box p={6}>
        <Stack spacing={3}>
          <Link href={url} isExternal>
            <Heading fontSize="xl">{title}</Heading>
          </Link>

          <Text fontSize="sm">{description}</Text>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Badge colorScheme="teal">{source}</Badge>
            <Text fontSize="xs">{new Date(publishedAt).toLocaleString()}</Text>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default NewsItem;
