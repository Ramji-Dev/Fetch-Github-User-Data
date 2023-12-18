import { useEffect, useState } from 'react'

function App() {

  
  const [user, setUser] = useState('ramji-dev');
  const [repo, setRepo] = useState([]);
  const [loading, isLoading] = useState(true);

  const url = `https://api.github.com/users/${user}`;
  const repo_url = `https://api.github.com/users/${user}/repos`;
  
  useEffect(() => {
    try {
      const userData = async () => {
        const data = await fetch(url);
        if (data.ok === true) {
          const res = await data.json();
          setUser(res);
          isLoading(false)
        } 
      };
      userData();
    } catch (error) {
      console.log(error);
    }
  },[user]);
  
  const limit = 5;
  useEffect(() => {
    try {
      const fetchRepo = async () => {
        const repoData = await(fetch(repo_url));
        if (repoData.ok === true) {
          const repoRes = await repoData.json();
          const limitedData = repoRes.slice(0, limit);
          setRepo(limitedData);
        } 
      }
      fetchRepo()
    } catch (error) {
      console.log(error);
    }
  },[user])

  if (loading) {
    setTimeout(() => {
      isLoading(false);
    }, 2000);
    return <h1 className='flex items-center justify-center'>Loading...</h1>
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      setUser(e.target.value);
    }
  }


  const {avatar_url, login, followers, following, html_url} = user;

  return (
    <div className='w-screen h-screen p-4 bg-black flex items-center justify-center flex-col'>
      <div className='text-white flex items-center justify-center flex-col mb-4'>
        <img src={avatar_url} alt={login} className='w-40 rounded-full mb-4 sm:w-60' />
        <div className='text-center flex flex-col'>
          <h1 className='text-3xl mb-3'>{login}</h1>
          <h2>Following: <span>{following}</span>, Followers: <span>{followers}</span></h2>
          <h2>Visit Github: <a href={html_url} target='_blank' className='hover:text-green-400 transition-all delay-150 ease-in-out'>{html_url}</a></h2>
        </div>
      </div>
      <div className='mb-4 w-full sm:w-2/3 text-white flex flex-wrap items-center justify-center'>
        <h1 className='mr-4 mb-2'>Repositories : </h1>
        {
          repo.map((repoData) => {
            const {id, name, svn_url} = repoData;
            return (
              <div key={id} >
                <div className='gap-4 '>
                  <h5 className='mr-3 flex'><a href={svn_url} target='_blank' className='border-2 rounded-full p-2 hover:bg-green-400 hover:text-green-800 transition-all delay-150 ease-in-out flex items-center justify-center whitespace-nowrap mb-2 text-sm sm:text-base'>{name}</a></h5>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className='flex items-center justify-center flex-col sm:flex-row'>
        <input type="text" onKeyDown={handleKeydown} className='p-2 px-4 bg-transparent placeholder:text-green-600 mb-2 sm:mb-0 sm:mr-2 text-green-400 border-2 border-green-400 rounded-full' placeholder='Search Username'/>
      </div>
    </div>
  )
}

export default App