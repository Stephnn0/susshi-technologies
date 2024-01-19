import { Link } from "react-router-dom"
import "./two-section-text.css"
import { FC } from "react";


interface TwoSecTextProps {
    titleRight: string;
    descriptionLeft: string;
    link: string
  }

const TwoSecText: FC<TwoSecTextProps>  = ({
    titleRight,
    descriptionLeft,
    link
}) => {
  return (
    <section className="two-sec-text">
        <div className="two-sec-text-left">
            <h3>{titleRight}</h3>

        </div>
        <div className="two-sec-text-right">
            <p>{descriptionLeft}</p>
                 <br/>
            <Link className="link" to={`/${link}`}>
            <h4>Learn more about it</h4>
            </Link>
            
        </div>
    </section>
  )
}

export default TwoSecText