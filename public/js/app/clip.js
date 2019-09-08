
export default function createClip(data) {
  const { clipId, time, } = data;

  let getId = () => {
      return clipId;
    },
    
    getTime = () => {
      return time;
    };

  return Object.freeze({
    getId,
    getTime,
  });
}