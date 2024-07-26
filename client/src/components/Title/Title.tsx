
import './title.css';
import '../ScissorsSVG/ScissorsSVG'
import ScissorsSVG from '../ScissorsSVG/ScissorsSVG';

const Title = () => {
  return (
    <div className='title-wrapper' >
        <h1 className='title-text'> 
          Cut it Out
        
        </h1>
        <ScissorsSVG/>
    </div>
  );
};

export default Title;
