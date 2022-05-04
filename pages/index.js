import Head from 'next/head'
import Image from 'next/image'
import RobotArea from '../src/components/RobotArea'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Robot Environment</title>
        <meta name="description" content="Robot Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RobotArea />
    </div>
  )
}
