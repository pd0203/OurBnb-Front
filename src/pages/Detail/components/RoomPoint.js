import React from 'react';
import styled from 'styled-components';
import RoomPointC from './RoomPointC';

export default function RoomPoint({ benefitData }) {
	return (
		<Wrapper>
			<PonintContainer>
				{benefitData &&
					benefitData.map(e => {
						return (
							<RoomPointC
								key={Math.random()}
								benefitLogoUrl={e.benefitLogoUrl}
								benefitTitle={e.benefitTitle}
								benefitDesc={e.benefitDesc}
							/>
						);
					})}
			</PonintContainer>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	border-bottom: 1px solid rgb(221, 221, 221);
`;

const PonintContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 25px;
`;
