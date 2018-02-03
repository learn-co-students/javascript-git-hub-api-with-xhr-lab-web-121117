let f = document.createElement('FORM')

let i = document.createElement("input"); //textbox
i.setAttribute('type',"text");
i.setAttribute('name',"username");
i.setAttribute('placeholder', 'search a username here')

let s = document.createElement("input"); //submit
s.setAttribute('type',"submit");
s.setAttribute('value',"Submit");

f.append(i)
f.append(s)

document.getElementById('form').append(f)

function getRepositories(event){
  event.preventDefault();

  req = new XMLHttpRequest()

  req.addEventListener('load', displayRepositories)
  req.open('GET', `https://api.github.com/users/${i.value}/repos`)
  req.send()

  i.value = ""
}

function displayRepositories(event){
  let repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r =>
    `<li>${r.name} -
    <a href="#" data-repo="${r.name}" data-user="${r.owner.login}" onclick="getCommits(this)">Get Commits</a> -
    <a href="#" data-repo="${r.name}" data-user="${r.owner.login}" onclick="getBranches(this)">Get Branches</a> </li>`).join('')}</ul>`
  document.getElementById('repositories').innerHTML = repoList

}

function getCommits(event){
  let req = new XMLHttpRequest()
  let repo = event.dataset.repo
  let user = event.dataset.user

  req.addEventListener('load', displayCommits)
  req.open('GET', `https://api.github.com/repos/${user}/${repo}/commits`)
  req.send()
}

function displayCommits(event){
  let commits = JSON.parse(this.responseText)
  const commitList = `<ul>${commits.map(c => `<li>User: ${c.author.login} - '${c.commit.message}'</li>`).join('')}</ul>`
  document.getElementById('details').innerHTML = commitList
}

function getBranches(event){
  let req = new XMLHttpRequest()
  let repo = event.dataset.repo
  let user = event.dataset.user

  req.addEventListener('load', displayBranches)
  req.open('GET', `https://api.github.com/repos/${user}/${repo}/branches`)
  req.send()
}

function displayBranches(event){
  let branches = JSON.parse(this.responseText)
  console.log(branches)
  const branchList = `<ul>${branches.map(b => `<li>Branch: ${b.name}</li>`).join('')}</ul>`
  document.getElementById('details').innerHTML = branchList
}
  s.addEventListener('click', getRepositories)
