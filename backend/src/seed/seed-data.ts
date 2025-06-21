import { CreateActorDto } from 'src/actor/dto/create-actor.dto';
import { hashSync } from 'bcrypt';

const actors: CreateActorDto[] = [
  {
    id: '1df93163-1539-43c7-8dbd-8ef0828e5f7d',
    name: 'Fernando',
    isActive: true,
  },
  {
    id: '08fb3977-4c0b-496d-8b75-2d0c7a7541a9',
    name: 'green fry',
    isActive: true,
  },
  {
    id: '026b8556-ab37-4c6a-96a7-c0537b36d8fd',
    name: 'aylin hugh',
    isActive: true,
  },
  {
    id: '47bced91-8484-4fcd-996f-e2ecdcc5b95d',
    name: 'may ans',
    isActive: true,
  },
  {
    id: '097df92c-1559-4a3e-abe9-5c3b63493cf2',
    name: 'sacha brick',
    isActive: true,
  },
  {
    id: '24b8b584-a588-4c95-95f6-9362a8b37ccc',
    name: 'brian ans',
    isActive: true,
  },
  {
    id: '00f1e73c-f415-4462-80eb-4c87d83f9b9b',
    name: 'aura liz',
    isActive: true,
  },
  {
    id: '1a0ff381-131a-415b-bd4f-a2aa60268a19',
    name: 'liz gin',
    isActive: true,
  },
  {
    id: '40573302-7d38-49c9-b09b-3ba53dd0cc83',
    name: 'fred andre',
    isActive: true,
  },
  {
    id: '0162d13f-5562-40f8-91d4-7d64cc6e3bb0',
    name: 'aime',
    isActive: true,
  },
];

const movies = [
  {
    id: '05b569a5-973f-4da4-9bc4-dd7db0aa90ee',
    name: 'Rapido y furioso 12',
    description: 'pelicula de autos',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: '1a2b3c4d-5e6f-7890-abcd-ef1234567890',
    name: 'The Lost City',
    description:
      'A reclusive romance novelist on a book tour with her cover model gets swept up in a kidnapping attempt that lands them both in a cutthroat jungle adventure',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: '2b3c4d5e-6f7a-8901-bcde-f23456789012',
    name: 'Midnight Mystery',
    description:
      'A detective investigates a series of mysterious disappearances in a small coastal town',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: '3c4d5e6f-7a8b-9012-cdef-345678901234',
    name: 'Space Odyssey 2077',
    description:
      'A crew of astronauts embarks on a mission to explore a newly discovered planet in a distant galaxy',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: '4d5e6f7a-8b9c-0123-defa-456789012345',
    name: 'The Last Dance',
    description:
      'A retired dancer returns to the stage for one final performance that could change everything',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: '5e6f7a8b-9c0d-1234-efab-567890123456',
    name: 'Mountain Peak',
    description:
      'A group of friends attempt to climb the most dangerous mountain in the world',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: '6f7a8b9c-0d1e-2345-fabc-678901234567',
    name: 'The Time Traveler',
    description:
      "A scientist accidentally discovers time travel and must fix the timeline before it's too late",
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: '7a8b9c0d-1e2f-3456-abcd-789012345678',
    name: "Ocean's Deep",
    description:
      'A marine biologist discovers an ancient underwater city that holds secrets of human evolution',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: '8b9c0d1e-2f3a-4567-bcde-890123456789',
    name: 'The Great Escape',
    description:
      'Prisoners plan an elaborate escape from a maximum-security facility',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: '9c0d1e2f-3a4b-5678-cdef-901234567890',
    name: 'The Perfect Storm',
    description:
      'A fishing boat crew faces the most dangerous storm ever recorded in the Atlantic',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: 'a1b2c3d4-e5f6-7890-1234-567890123456',
    name: 'The Silent Echo',
    description:
      'A deaf musician discovers she can hear through supernatural means and must use this gift to solve a murder',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: 'b2c3d4e5-f6a7-8901-2345-678901234567',
    name: 'Desert Winds',
    description:
      'A nomad in the Sahara discovers an ancient civilization buried beneath the sand',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: 'c3d4e5f6-a7b8-9012-3456-789012345678',
    name: 'The Quantum Paradox',
    description:
      'A physicist creates a machine that can predict the future, but each prediction changes the timeline',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: 'd4e5f6a7-b8c9-0123-4567-890123456789',
    name: 'Arctic Expedition',
    description:
      'A team of researchers gets stranded in the Arctic and must survive while uncovering a government conspiracy',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: 'e5f6a7b8-c9d0-1234-5678-901234567890',
    name: 'The Last Stand',
    description:
      'A small town sheriff must defend his community against a gang of ruthless outlaws',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: 'f6a7b8c9-d0e1-2345-6789-012345678901',
    name: 'Digital Dreams',
    description:
      'A programmer gets trapped inside a virtual reality world and must navigate through digital landscapes to escape',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: 'a7b8c9d0-e1f2-3456-7890-123456789012',
    name: 'The Hidden Truth',
    description:
      "A journalist uncovers a massive corporate cover-up that threatens to destroy the world's economy",
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: 'b8c9d0e1-f2a3-4567-8901-234567890123',
    name: 'Flying High',
    description:
      'A pilot must land a damaged commercial aircraft during a severe storm',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: 'c9d0e1f2-a3b4-5678-9012-345678901234',
    name: 'The Ancient Scroll',
    description:
      'An archaeologist discovers a scroll that contains the secret to immortality',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: 'd0e1f2a3-b4c5-6789-0123-456789012345',
    name: 'City of Shadows',
    description:
      'A private investigator searches for a missing person in a city where nothing is as it seems',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: 'e1f2a3b4-c5d6-7890-1234-567890123456',
    name: 'The Final Countdown',
    description:
      'A nuclear power plant worker must prevent a meltdown that could destroy an entire city',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: 'f2a3b4c5-d6e7-8901-2345-678901234567',
    name: 'The Lost Treasure',
    description:
      "A treasure hunter follows an ancient map to find a legendary pirate's hidden gold",
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: 'a3b4c5d6-e7f8-9012-3456-789012345678',
    name: 'The Mind Reader',
    description:
      'A psychologist discovers she can read minds and must use this ability to solve a series of crimes',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: 'b4c5d6e7-f8a9-0123-4567-890123456789',
    name: 'The Last Survivor',
    description:
      'The last human on Earth must find other survivors while avoiding deadly robots',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: 'c5d6e7f8-a9b0-1234-5678-901234567890',
    name: 'The Magic Mirror',
    description:
      'A young woman discovers a mirror that can show her the future and must decide whether to change it',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: 'd6e7f8a9-b0c1-2345-6789-012345678901',
    name: 'The Underground City',
    description:
      'A group of explorers discovers a massive underground city beneath New York',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: 'e7f8a9b0-c1d2-3456-7890-123456789012',
    name: 'The Time Machine',
    description:
      'A scientist builds a time machine and travels to different eras to fix historical mistakes',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: 'f8a9b0c1-d2e3-4567-8901-234567890123',
    name: 'The Last Battle',
    description:
      'A medieval knight must lead his army against an invading force of supernatural creatures',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: 'a9b0c1d2-e3f4-5678-9012-345678901234',
    name: 'The Secret Garden',
    description:
      'A young girl discovers a magical garden that can heal any illness',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
  {
    id: 'b0c1d2e3-f4a5-6789-0123-456789012345',
    name: 'The Final Frontier',
    description:
      'The first human mission to Mars encounters unexpected challenges and discoveries',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
  },
];

export const updatedMovies = [
  {
    id: '05b569a5-973f-4da4-9bc4-dd7db0aa90ee',
    name: 'Rapido y furioso 12',
    description: 'pelicula de autos',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 8,
        review: 'Amazing action sequences',
      },
      {
        rating: 7,
        review: 'Great car chases',
      },
      {
        rating: 6,
        review: 'Entertaining but predictable',
      },
    ],
    actors: [
      {
        id: '1df93163-1539-43c7-8dbd-8ef0828e5f7d',
        name: 'Fernando',
        isActive: true,
      },
      {
        id: '08fb3977-4c0b-496d-8b75-2d0c7a7541a9',
        name: 'green fry',
        isActive: true,
      },
    ],
  },
  {
    id: '1a2b3c4d-5e6f-7890-abcd-ef1234567890',
    name: 'The Lost City',
    description:
      'A reclusive romance novelist on a book tour with her cover model gets swept up in a kidnapping attempt that lands them both in a cutthroat jungle adventure',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 9,
        review: 'Perfect adventure comedy',
      },
      {
        rating: 8,
        review: 'Hilarious and exciting',
      },
    ],
    actors: [
      {
        id: '026b8556-ab37-4c6a-96a7-c0537b36d8fd',
        name: 'aylin hugh',
        isActive: true,
      },
      {
        id: '47bced91-8484-4fcd-996f-e2ecdcc5b95d',
        name: 'may ans',
        isActive: true,
      },
    ],
  },
  {
    id: '2b3c4d5e-6f7a-8901-bcde-f23456789012',
    name: 'Midnight Mystery',
    description:
      'A detective investigates a series of mysterious disappearances in a small coastal town',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 8,
        review: 'Gripping mystery',
      },
      {
        rating: 7,
        review: 'Well-crafted suspense',
      },
    ],
    actors: [
      {
        id: '097df92c-1559-4a3e-abe9-5c3b63493cf2',
        name: 'sacha brick',
        isActive: true,
      },
      {
        id: '24b8b584-a588-4c95-95f6-9362a8b37ccc',
        name: 'brian ans',
        isActive: true,
      },
    ],
  },
  {
    id: '3c4d5e6f-7a8b-9012-cdef-345678901234',
    name: 'Space Odyssey 2077',
    description:
      'A crew of astronauts embarks on a mission to explore a newly discovered planet in a distant galaxy',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 9,
        review: 'Mind-blowing sci-fi',
      },
      {
        rating: 8,
        review: 'Amazing visuals',
      },
    ],
    actors: [
      {
        id: '00f1e73c-f415-4462-80eb-4c87d83f9b9b',
        name: 'aura liz',
        isActive: true,
      },
      {
        id: '1a0ff381-131a-415b-bd4f-a2aa60268a19',
        name: 'liz gin',
        isActive: true,
      },
    ],
  },
  {
    id: '4d5e6f7a-8b9c-0123-defa-456789012345',
    name: 'The Last Dance',
    description:
      'A retired dancer returns to the stage for one final performance that could change everything',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 8,
        review: 'Beautiful choreography',
      },
      {
        rating: 7,
        review: 'Emotional story',
      },
    ],
    actors: [
      {
        id: '40573302-7d38-49c9-b09b-3ba53dd0cc83',
        name: 'fred andre',
        isActive: true,
      },
      {
        id: '0162d13f-5562-40f8-91d4-7d64cc6e3bb0',
        name: 'aime',
        isActive: true,
      },
    ],
  },
  {
    id: '5e6f7a8b-9c0d-1234-efab-567890123456',
    name: 'Mountain Peak',
    description:
      'A group of friends attempt to climb the most dangerous mountain in the world',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 8,
        review: 'Thrilling adventure',
      },
      {
        rating: 7,
        review: 'Great survival story',
      },
    ],
    actors: [
      {
        id: '1df93163-1539-43c7-8dbd-8ef0828e5f7d',
        name: 'Fernando',
        isActive: true,
      },
      {
        id: '08fb3977-4c0b-496d-8b75-2d0c7a7541a9',
        name: 'green fry',
        isActive: true,
      },
    ],
  },
  {
    id: '6f7a8b9c-0d1e-2345-fabc-678901234567',
    name: 'The Time Traveler',
    description:
      "A scientist accidentally discovers time travel and must fix the timeline before it's too late",
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 9,
        review: 'Brilliant concept',
      },
      {
        rating: 8,
        review: 'Complex but rewarding',
      },
    ],
    actors: [
      {
        id: '026b8556-ab37-4c6a-96a7-c0537b36d8fd',
        name: 'aylin hugh',
        isActive: true,
      },
      {
        id: '47bced91-8484-4fcd-996f-e2ecdcc5b95d',
        name: 'may ans',
        isActive: true,
      },
    ],
  },
  {
    id: '7a8b9c0d-1e2f-3456-abcd-789012345678',
    name: "Ocean's Deep",
    description:
      'A marine biologist discovers an ancient underwater city that holds secrets of human evolution',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 8,
        review: 'Fascinating underwater world',
      },
      {
        rating: 7,
        review: 'Great mystery elements',
      },
    ],
    actors: [
      {
        id: '097df92c-1559-4a3e-abe9-5c3b63493cf2',
        name: 'sacha brick',
        isActive: true,
      },
      {
        id: '24b8b584-a588-4c95-95f6-9362a8b37ccc',
        name: 'brian ans',
        isActive: true,
      },
    ],
  },
  {
    id: '8b9c0d1e-2f3a-4567-bcde-890123456789',
    name: 'The Great Escape',
    description:
      'Prisoners plan an elaborate escape from a maximum-security facility',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 8,
        review: 'Tense and exciting',
      },
      {
        rating: 7,
        review: 'Great prison break story',
      },
    ],
    actors: [
      {
        id: '00f1e73c-f415-4462-80eb-4c87d83f9b9b',
        name: 'aura liz',
        isActive: true,
      },
      {
        id: '1a0ff381-131a-415b-bd4f-a2aa60268a19',
        name: 'liz gin',
        isActive: true,
      },
    ],
  },
  {
    id: '9c0d1e2f-3a4b-5678-cdef-901234567890',
    name: 'The Perfect Storm',
    description:
      'A fishing boat crew faces the most dangerous storm ever recorded in the Atlantic',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 8,
        review: 'Intense survival drama',
      },
      {
        rating: 7,
        review: 'Realistic storm sequences',
      },
    ],
    actors: [
      {
        id: '40573302-7d38-49c9-b09b-3ba53dd0cc83',
        name: 'fred andre',
        isActive: true,
      },
      {
        id: '0162d13f-5562-40f8-91d4-7d64cc6e3bb0',
        name: 'aime',
        isActive: true,
      },
    ],
  },
  {
    id: 'a1b2c3d4-e5f6-7890-1234-567890123456',
    name: 'The Silent Echo',
    description:
      'A deaf musician discovers she can hear through supernatural means and must use this gift to solve a murder',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 9,
        review: 'Unique supernatural mystery',
      },
      {
        rating: 8,
        review: 'Great character development',
      },
    ],
    actors: [
      {
        id: '1df93163-1539-43c7-8dbd-8ef0828e5f7d',
        name: 'Fernando',
        isActive: true,
      },
      {
        id: '08fb3977-4c0b-496d-8b75-2d0c7a7541a9',
        name: 'green fry',
        isActive: true,
      },
    ],
  },
  {
    id: 'b2c3d4e5-f6a7-8901-2345-678901234567',
    name: 'Desert Winds',
    description:
      'A nomad in the Sahara discovers an ancient civilization buried beneath the sand',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 8,
        review: 'Epic desert adventure',
      },
      {
        rating: 7,
        review: 'Amazing archaeological discovery',
      },
    ],
    actors: [
      {
        id: '026b8556-ab37-4c6a-96a7-c0537b36d8fd',
        name: 'aylin hugh',
        isActive: true,
      },
      {
        id: '47bced91-8484-4fcd-996f-e2ecdcc5b95d',
        name: 'may ans',
        isActive: true,
      },
    ],
  },
  {
    id: 'c3d4e5f6-a7b8-9012-3456-789012345678',
    name: 'The Quantum Paradox',
    description:
      'A physicist creates a machine that can predict the future, but each prediction changes the timeline',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 9,
        review: 'Mind-bending sci-fi',
      },
      {
        rating: 8,
        review: 'Complex but fascinating',
      },
    ],
    actors: [
      {
        id: '097df92c-1559-4a3e-abe9-5c3b63493cf2',
        name: 'sacha brick',
        isActive: true,
      },
      {
        id: '24b8b584-a588-4c95-95f6-9362a8b37ccc',
        name: 'brian ans',
        isActive: true,
      },
    ],
  },
  {
    id: 'd4e5f6a7-b8c9-0123-4567-890123456789',
    name: 'Arctic Expedition',
    description:
      'A team of researchers gets stranded in the Arctic and must survive while uncovering a government conspiracy',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 8,
        review: 'Chilling survival story',
      },
      {
        rating: 7,
        review: 'Great conspiracy elements',
      },
    ],
    actors: [
      {
        id: '00f1e73c-f415-4462-80eb-4c87d83f9b9b',
        name: 'aura liz',
        isActive: true,
      },
      {
        id: '1a0ff381-131a-415b-bd4f-a2aa60268a19',
        name: 'liz gin',
        isActive: true,
      },
    ],
  },
  {
    id: 'e5f6a7b8-c9d0-1234-5678-901234567890',
    name: 'The Last Stand',
    description:
      'A small town sheriff must defend his community against a gang of ruthless outlaws',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 8,
        review: 'Classic western action',
      },
      {
        rating: 7,
        review: 'Great showdown scenes',
      },
    ],
    actors: [
      {
        id: '40573302-7d38-49c9-b09b-3ba53dd0cc83',
        name: 'fred andre',
        isActive: true,
      },
      {
        id: '0162d13f-5562-40f8-91d4-7d64cc6e3bb0',
        name: 'aime',
        isActive: true,
      },
    ],
  },
  {
    id: 'f6a7b8c9-d0e1-2345-6789-012345678901',
    name: 'Digital Dreams',
    description:
      'A programmer gets trapped inside a virtual reality world and must navigate through digital landscapes to escape',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 9,
        review: 'Revolutionary VR concept',
      },
      {
        rating: 8,
        review: 'Amazing digital world',
      },
    ],
    actors: [
      {
        id: '1df93163-1539-43c7-8dbd-8ef0828e5f7d',
        name: 'Fernando',
        isActive: true,
      },
      {
        id: '08fb3977-4c0b-496d-8b75-2d0c7a7541a9',
        name: 'green fry',
        isActive: true,
      },
    ],
  },
  {
    id: 'a7b8c9d0-e1f2-3456-7890-123456789012',
    name: 'The Hidden Truth',
    description:
      "A journalist uncovers a massive corporate cover-up that threatens to destroy the world's economy",
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 8,
        review: 'Gripping conspiracy thriller',
      },
      {
        rating: 7,
        review: 'Relevant social commentary',
      },
    ],
    actors: [
      {
        id: '026b8556-ab37-4c6a-96a7-c0537b36d8fd',
        name: 'aylin hugh',
        isActive: true,
      },
      {
        id: '47bced91-8484-4fcd-996f-e2ecdcc5b95d',
        name: 'may ans',
        isActive: true,
      },
    ],
  },
  {
    id: 'b8c9d0e1-f2a3-4567-8901-234567890123',
    name: 'Flying High',
    description:
      'A pilot must land a damaged commercial aircraft during a severe storm',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 8,
        review: 'Tense aviation drama',
      },
      {
        rating: 7,
        review: 'Realistic flight sequences',
      },
    ],
    actors: [
      {
        id: '097df92c-1559-4a3e-abe9-5c3b63493cf2',
        name: 'sacha brick',
        isActive: true,
      },
      {
        id: '24b8b584-a588-4c95-95f6-9362a8b37ccc',
        name: 'brian ans',
        isActive: true,
      },
    ],
  },
  {
    id: 'c9d0e1f2-a3b4-5678-9012-345678901234',
    name: 'The Ancient Scroll',
    description:
      'An archaeologist discovers a scroll that contains the secret to immortality',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 8,
        review: 'Fascinating archaeological adventure',
      },
      {
        rating: 7,
        review: 'Great historical elements',
      },
    ],
    actors: [
      {
        id: '00f1e73c-f415-4462-80eb-4c87d83f9b9b',
        name: 'aura liz',
        isActive: true,
      },
      {
        id: '1a0ff381-131a-415b-bd4f-a2aa60268a19',
        name: 'liz gin',
        isActive: true,
      },
    ],
  },
  {
    id: 'd0e1f2a3-b4c5-6789-0123-456789012345',
    name: 'City of Shadows',
    description:
      'A private investigator searches for a missing person in a city where nothing is as it seems',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 8,
        review: 'Atmospheric noir mystery',
      },
      {
        rating: 7,
        review: 'Great detective story',
      },
    ],
    actors: [
      {
        id: '40573302-7d38-49c9-b09b-3ba53dd0cc83',
        name: 'fred andre',
        isActive: true,
      },
      {
        id: '0162d13f-5562-40f8-91d4-7d64cc6e3bb0',
        name: 'aime',
        isActive: true,
      },
    ],
  },
  {
    id: 'e1f2a3b4-c5d6-7890-1234-567890123456',
    name: 'The Final Countdown',
    description:
      'A nuclear power plant worker must prevent a meltdown that could destroy an entire city',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 8,
        review: 'High-stakes thriller',
      },
      {
        rating: 7,
        review: 'Realistic disaster scenario',
      },
    ],
    actors: [
      {
        id: '1df93163-1539-43c7-8dbd-8ef0828e5f7d',
        name: 'Fernando',
        isActive: true,
      },
      {
        id: '08fb3977-4c0b-496d-8b75-2d0c7a7541a9',
        name: 'green fry',
        isActive: true,
      },
    ],
  },
  {
    id: 'f2a3b4c5-d6e7-8901-2345-678901234567',
    name: 'The Lost Treasure',
    description:
      "A treasure hunter follows an ancient map to find a legendary pirate's hidden gold",
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 8,
        review: 'Exciting treasure hunt',
      },
      {
        rating: 7,
        review: 'Great adventure story',
      },
    ],
    actors: [
      {
        id: '026b8556-ab37-4c6a-96a7-c0537b36d8fd',
        name: 'aylin hugh',
        isActive: true,
      },
      {
        id: '47bced91-8484-4fcd-996f-e2ecdcc5b95d',
        name: 'may ans',
        isActive: true,
      },
    ],
  },
  {
    id: 'a3b4c5d6-e7f8-9012-3456-789012345678',
    name: 'The Mind Reader',
    description:
      'A psychologist discovers she can read minds and must use this ability to solve a series of crimes',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 8,
        review: 'Unique supernatural crime drama',
      },
      {
        rating: 7,
        review: 'Great psychological elements',
      },
    ],
    actors: [
      {
        id: '097df92c-1559-4a3e-abe9-5c3b63493cf2',
        name: 'sacha brick',
        isActive: true,
      },
      {
        id: '24b8b584-a588-4c95-95f6-9362a8b37ccc',
        name: 'brian ans',
        isActive: true,
      },
    ],
  },
  {
    id: 'b4c5d6e7-f8a9-0123-4567-890123456789',
    name: 'The Last Survivor',
    description:
      'The last human on Earth must find other survivors while avoiding deadly robots',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 8,
        review: 'Post-apocalyptic survival',
      },
      {
        rating: 7,
        review: 'Great robot antagonists',
      },
    ],
    actors: [
      {
        id: '00f1e73c-f415-4462-80eb-4c87d83f9b9b',
        name: 'aura liz',
        isActive: true,
      },
      {
        id: '1a0ff381-131a-415b-bd4f-a2aa60268a19',
        name: 'liz gin',
        isActive: true,
      },
    ],
  },
  {
    id: 'c5d6e7f8-a9b0-1234-5678-901234567890',
    name: 'The Magic Mirror',
    description:
      'A young woman discovers a mirror that can show her the future and must decide whether to change it',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 8,
        review: 'Magical fantasy adventure',
      },
      {
        rating: 7,
        review: 'Great moral choices',
      },
    ],
    actors: [
      {
        id: '40573302-7d38-49c9-b09b-3ba53dd0cc83',
        name: 'fred andre',
        isActive: true,
      },
      {
        id: '0162d13f-5562-40f8-91d4-7d64cc6e3bb0',
        name: 'aime',
        isActive: true,
      },
    ],
  },
  {
    id: 'd6e7f8a9-b0c1-2345-6789-012345678901',
    name: 'The Underground City',
    description:
      'A group of explorers discovers a massive underground city beneath New York',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 8,
        review: 'Amazing underground discovery',
      },
      {
        rating: 7,
        review: 'Great urban exploration',
      },
    ],
    actors: [
      {
        id: '1df93163-1539-43c7-8dbd-8ef0828e5f7d',
        name: 'Fernando',
        isActive: true,
      },
      {
        id: '08fb3977-4c0b-496d-8b75-2d0c7a7541a9',
        name: 'green fry',
        isActive: true,
      },
    ],
  },
  {
    id: 'e7f8a9b0-c1d2-3456-7890-123456789012',
    name: 'The Time Machine',
    description:
      'A scientist builds a time machine and travels to different eras to fix historical mistakes',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 9,
        review: 'Classic time travel adventure',
      },
      {
        rating: 8,
        review: 'Historical accuracy',
      },
    ],
    actors: [
      {
        id: '026b8556-ab37-4c6a-96a7-c0537b36d8fd',
        name: 'aylin hugh',
        isActive: true,
      },
      {
        id: '47bced91-8484-4fcd-996f-e2ecdcc5b95d',
        name: 'may ans',
        isActive: true,
      },
    ],
  },
  {
    id: 'f8a9b0c1-d2e3-4567-8901-234567890123',
    name: 'The Last Battle',
    description:
      'A medieval knight must lead his army against an invading force of supernatural creatures',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 8,
        review: 'Epic medieval fantasy',
      },
      {
        rating: 7,
        review: 'Great battle sequences',
      },
    ],
    actors: [
      {
        id: '097df92c-1559-4a3e-abe9-5c3b63493cf2',
        name: 'sacha brick',
        isActive: true,
      },
      {
        id: '24b8b584-a588-4c95-95f6-9362a8b37ccc',
        name: 'brian ans',
        isActive: true,
      },
    ],
  },
  {
    id: 'a9b0c1d2-e3f4-5678-9012-345678901234',
    name: 'The Secret Garden',
    description:
      'A young girl discovers a magical garden that can heal any illness',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 8,
        review: 'Magical family adventure',
      },
      {
        rating: 7,
        review: 'Beautiful garden scenes',
      },
    ],
    actors: [
      {
        id: '00f1e73c-f415-4462-80eb-4c87d83f9b9b',
        name: 'aura liz',
        isActive: true,
      },
      {
        id: '1a0ff381-131a-415b-bd4f-a2aa60268a19',
        name: 'liz gin',
        isActive: true,
      },
    ],
  },
  {
    id: 'b0c1d2e3-f4a5-6789-0123-456789012345',
    name: 'The Final Frontier',
    description:
      'The first human mission to Mars encounters unexpected challenges and discoveries',
    isActive: true,
    imgUrl: 'https://placehold.co/308x360',
    ratings: [
      {
        rating: 9,
        review: 'Realistic space exploration',
      },
      {
        rating: 8,
        review: 'Amazing Mars discovery',
      },
    ],
    actors: [
      {
        id: '40573302-7d38-49c9-b09b-3ba53dd0cc83',
        name: 'fred andre',
        isActive: true,
      },
      {
        id: '0162d13f-5562-40f8-91d4-7d64cc6e3bb0',
        name: 'aime',
        isActive: true,
      },
    ],
  },
];

export const initialData = {
  users: [
    {
      email: 'admin@gmail.com',
      password: hashSync('123456', 10),
      name: 'Admin',
    },
  ],
  movies: movies,
  actors: actors,
};
