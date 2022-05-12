import './followus.css';
import { Functionfollowus} from './functionfollowus';
import { socialContainer } from './socialcontainer';

export function Followus() {
    return (
        <div>
          <h3>עקבו אחרינו</h3>
          <Functionfollowus socialMedia={socialContainer}/>

        </div>
    )
}
