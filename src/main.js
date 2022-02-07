import os from "node:os";
import  path from "node:path";
import  inquirer from "inquirer";
import  gitClonePull from "git-pull-or-clone";

const repertoireProjet = os.homedir();
//correspond à /Users/virginieporquez
const repProjets = path.resolve(repertoireProjet, '/projets/FormationNodeJs/Clone/');
//on ajoute /projets/FormationNodeJs/Clone";
 //   console.log (repProjets);
//Poser la question au user pour récupérer le repo
const res = await inquirer.prompt(
    [
        {type: 'input', 
        name: 'repo', 
        message: `Quel est repository à copier (format user/repo) ?`,
        //Bonus fonction de validation du format saisie. Si KO la question est reposée
        validate: (val) =>{
            const parts = val.split("/");
            if (parts.length ===2){
                return true;
            }
            if (parts.length === 1){
                return "Mauvais format de réponse (user/repo)";
            }
            return 'Invalid string';
        },
        }
        ,
        {type: 'input', 
        name: 'repertoire', 
        message:"Dans quel répertoire ?"
        }
    ]
    );

//Déstructuration de la réponse 1
const [user, repo] = res.repo.split("/");

const repClone = path.resolve(repProjets, res.repertoire);
console.log(repClone);

//Construction de l'URL à appeler
const url = `git@github.com:${user}/${repo}.git`;

//Lancer le clone du projet
gitClonePull(url, repClone, (res,err) => {
    if (err) 
    console.log (err);
}
    );

console.log(`Repo cloned in ${repClone}`);
     


 
/*
main();

async function main() {
  const res = await inquirer.prompt({ type: 'input', name: 'repo', message: 'Entrez user/repo' });
  console.log(res.repo)
}*/