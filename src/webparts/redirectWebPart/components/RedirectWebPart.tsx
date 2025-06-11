import * as React from 'react';
import type { IRedirectWebPartProps } from './IRedirectWebPartProps';
import * as bike from '../assets/bike.png';
import * as grass from '../assets/grass.png';
import styles from './RedirectWebPart.module.scss';

export default class RedirectWebPart extends React.Component<IRedirectWebPartProps, {}> {
	public render(): React.ReactElement<IRedirectWebPartProps> {
		
		return (
			<>
				<div className={styles.root}>
					<span>We're getting ready to take you to VillageWeb; just one moment</span>
					<img className={styles.bike} src={bike.default} />
					<img  className={styles.grass} src={grass.default} />
				</div>
				<style>{`
					#CommentsWrapper { display: none; }
				`}</style>
			</>
		);
	}
}
