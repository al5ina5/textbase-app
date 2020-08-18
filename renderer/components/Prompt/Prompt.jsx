import styles from './Prompt.module.scss'

export default function Prompt(props) {

    return <>
        <div className={styles.Prompt}>
            <div className={styles.contain}>
                {props.message}

                {props.children}
                <button onClick={(e) => {
                    props.children.map((child, index) => {
                        console.log(child.toString())
                    })
                }}>Submit</button>
            </div>
        </div>
    </>
}