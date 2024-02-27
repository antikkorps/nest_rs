import { faker } from '@faker-js/faker';

// export const fakerPost = (): any => ({
//     description: faker.lorem.lines({ min: 1, max: 3 }),
//     user_status: "PUBLISHED",
//     postBody: [
//       {
//         postTypeChoice: "MEDIA",
//         postContent: [
//           {content: faker.image.url()},
//           {content: faker.image.url()},
//           {content: faker.image.url()}
//         ]
//       },
//       {
//         postTypeChoice: "TEXT",
//         postContent: [
//           {content: faker.lorem.lines({ min: 1, max: 3 })},
//           {content: faker.lorem.lines({ min: 1, max: 3 })}
//         ]
//       }
//     ],
//     userId: 1,
//     tags: [
//       { name: faker.word.adverb(9) },
//       { name: faker.word.adverb(9) },
//     ]
//   })

export const fakerPost = (): any => {
  const postBody = [
    {
      postTypeChoice: 'MEDIA',
      postContent: [
        { content: faker.image.url() },
        { content: faker.image.url() },
        { content: faker.image.url() },
      ],
    },
    {
      postTypeChoice: 'TEXT',
      postContent: [
        { content: faker.lorem.lines({ min: 1, max: 3 }) },
        { content: faker.lorem.lines({ min: 1, max: 3 }) },
      ],
    },
  ];
  const postTypeChoiceCreate = postBody.map((body) => ({
    type: body.postTypeChoice,
    content: {
      create: body.postContent.map((content) => ({
        content: content.content,
      })),
    },
  }));

  const tags = [{ name: faker.word.adverb(9) }, { name: faker.word.adverb(9) }];

  const tagsConnectOrCreate = tags.map((tag) => ({
    where: { name: tag.name },
    create: { name: tag.name },
  }));

  return {
    title: faker.lorem.lines(1),
    description: faker.lorem.lines({ min: 1, max: 3 }),
    user_status: 'PUBLISHED',
    postTypeChoice: {
      create: postTypeChoiceCreate,
    },
    tags: {
      create: tagsConnectOrCreate.map((tag) => ({
        tag: {
          connectOrCreate: tag,
        },
      })),
    },
    userId: 1,
    views: faker.number.int({ min: 10, max: 1000000 }),
    shared: faker.number.int({ min: 10, max: 1000000 }),
    repost: faker.number.int({ min: 10, max: 1000000 }),
  };
};
