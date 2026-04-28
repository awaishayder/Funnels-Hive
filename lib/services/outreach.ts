export function buildOutreach(lead:{name:string;issues:string[]}){
  const base = `Hey ${lead.name}, I noticed ${lead.issues[0].toLowerCase()} and wanted to share a quick fix.`;
  return {email:base,linkedin:base,whatsapp:base,callScript:`Intro -> ${base} -> ask for 15-min audit review`};
}
