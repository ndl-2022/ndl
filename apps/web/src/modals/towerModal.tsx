import { Tower } from '@ndl/shared';
import { Button } from '@mui/material';

export default function TowerModal({ tower }: { tower: Tower }) {
  return (
    <div className="tower-menu">
      <div className="tower-infos">
        <table>
          <tbody>
            <tr>
              <td>Damage</td>
              <td>{tower.damage}</td>
              <td>
                <Button type="button">Upgrade</Button>
              </td>
            </tr>
            <tr>
              <td>Range</td>
              <td>{tower.attackRange}</td>
              <td>
                <Button type="button">Upgrade</Button>
              </td>
            </tr>
            <tr>
              <td>Attack Speed</td>
              <td>{tower.attackSpeed}</td>
              <td>
                <Button type="button">Upgrade</Button>
              </td>
            </tr>
            <tr>
              <td>Slowness</td>
              <td>{tower.slowness}</td>
              <td>
                <Button type="button">Upgrade</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
