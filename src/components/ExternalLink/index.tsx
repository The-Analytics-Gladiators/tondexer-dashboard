import externalLogo from '../../assets/externallink.svg'

const ExternalLink: React.FC<{url: string}> = ({ url }) => {
  return <a target="_blank"
  			href={url}>
	  <img src={externalLogo} style={{ width: '14px', filter: 'invert(50%)' }}/>
	</a>
}

export default ExternalLink



