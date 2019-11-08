import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import DOMPurify from 'dompurify'; 
import marked from 'marked';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const linkRenderer = new marked.Renderer();

linkRenderer.link = (href, title, text) =>
{
	title = title ? title : href;
	text = text ? text : href;
	
	return (`<a target='_blank' href='${ href }' title='${ title }'>${ text }</a>`);
};

const styles = (theme) =>
	({
		root :
		{
			display      : 'flex',
			marginBottom : theme.spacing(1),
			padding      : theme.spacing(1),
			flexShrink   : 0
		},
		selfMessage :
		{
			marginLeft : 'auto'
		},
		remoteMessage :
		{
			marginRight : 'auto'
		},
		text :
		{
			'& p' :
			{
				margin : 0
			}
		},
		content :
		{
			marginLeft : theme.spacing(1)
		},
		avatar :
		{
			borderRadius : '50%',
			height       : '2rem',
			alignSelf    : 'center'
		}
	});

const Message = (props) =>
{
	const {
		self,
		picture,
		text,
		time,
		name,
		classes
	} = props;

	return (
		<Paper
			className={classnames(
				classes.root,
				self ? classes.selfMessage : classes.remoteMessage
			)}
		>
			<img alt='Avatar' className={classes.avatar} src={picture} />
			<div className={classes.content}>
				<Typography
					className={classes.text}
					variant='subtitle1'
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{ __html : DOMPurify.sanitize(
						marked.parse(
							text,
							{ renderer: linkRenderer }
						)
					) }}
				/>
				<Typography variant='caption'>{self ? 'Me' : name} - {time}</Typography>
			</div>
		</Paper>
	);
};

Message.propTypes =
{
	self    : PropTypes.bool,
	picture : PropTypes.string,
	text    : PropTypes.string,
	time    : PropTypes.object,
	name    : PropTypes.string,
	classes : PropTypes.object.isRequired
};

export default withStyles(styles)(Message);