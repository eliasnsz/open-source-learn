import { User } from "@/contexts/AuthContext"
import { getApi } from "@/services/getApi"
import { Course } from "@/types"
import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"

export default function AdminPage() {
  return (
    <>
      Admin page
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const { ["session"]: token } = parseCookies(context)
  const api = getApi(context)

  if (!token) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false
      },
    }
  }

  const userResponse = await api.get("/user")
  const dataResponse = await api.get<Course>("/courses")
  const { user }: { user: User }  = userResponse.data
  
  if (!user.isAdmin) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user,
      courses: dataResponse.data
    },
  }
}