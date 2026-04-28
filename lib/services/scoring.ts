export function scoreLead(signals:{ads:boolean;hiring:boolean;badReviews:number;seoPoor:boolean;siteOutdated:boolean}){
  let score = 10;
  if(signals.ads) score += 25; if(signals.hiring) score += 20; score += Math.min(20, signals.badReviews*4);
  if(signals.seoPoor) score += 15; if(signals.siteOutdated) score += 10;
  const temp = score > 70 ? 'HOT' : score > 40 ? 'WARM' : 'COLD';
  return {score: Math.min(100, score), temperature: temp};
}
