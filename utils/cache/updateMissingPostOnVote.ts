import { ApolloCache, gql } from '@apollo/client';
import { MissingPost } from 'generated/graphql';

export const updateMissingPostCacheOnVote = (
  cache: ApolloCache<any>,
  data: any,
  votingValue: 1 | -1,
  postId: number,
  voteStatus?: number | null
) => {
  console.log(`🚀 ~ file: updateMissingPostOnVote.ts ~ line 11 ~ data`, data);
  //1. see if the user has already voted on this post
  const hasVoted = voteStatus !== null;

  if (!data?.vote?.success) return;
  //2. get the existing post from cache
  const cachedPost = cache.readFragment({
    id: `MissingPost:${postId}`,
    fragment: gql`
      fragment MissingPost on MissingPost {
        id
        points
        voteStatus
      }
    `,
  }) as Partial<MissingPost>;

  if (cachedPost && typeof cachedPost.points === 'number') {
    /* update the cache
      updated points value has 3 cases
       1. the user has already voted
       2. the user did not vote before 
       3. the user revoted the  same vote again (he wants to remove his vote)
       */

    let addedPoints = 0;
    let newVoteStatus: 1 | -1 | null = null;
    //if the user has already voted, then the did not change his vote value then just decrease it by the voting value
    if (cachedPost.voteStatus === votingValue) {
      //then the user want to just delete his vote
      //1. decrease the points by the voting value
      addedPoints = -votingValue;
      //2. set the voteStatus to null
    } else {
      addedPoints = hasVoted ? votingValue * 2 : votingValue;
      newVoteStatus = votingValue;
    }
    cache.writeFragment({
      id: `MissingPost:${postId}`,
      fragment: gql`
        fragment MissingPost on MissingPost {
          points
          voteStatus
        }
      `,
      data: {
        points: cachedPost.points + addedPoints,
        voteStatus: newVoteStatus,
      },
    });
  }
};
