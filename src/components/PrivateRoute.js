import { useRouter } from "next/navigation"


function UserRoute({children}) {

    const token=document.cookie.split('=')[1]
   const router=useRouter()

  return (
    <> {token  ? children : router.push('/') } </>
  )
}

export default UserRoute