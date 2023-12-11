import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';

const BookByIssues = () => {
	return (
		<div className='px-7'>
			<div className='grid xl:grid-rows-2 xl:grid-cols-3 gap-7 md:grid-rows-3 md:grid-cols-2'>
				<div>
					<Form.Dropdown
						label='Purpose of Visit'
						placeholder='Select purpose of visit'
						menuItems={ [
							{ key: 'Tes 1', value: 'Tes 1' },
							{ key: 'Tes 2', value: 'Tes 2' },
							{ key: 'Tes 3', value: 'Tes 3' },
						] }
						onChange={ (event: { currentTarget: { value: any; }; }) => {
							// to get value from event, get it like below
							event.currentTarget.value;
						} }
					/>
				</div>
				<div>
					<Form.Dropdown
						label='Medical Issues'
						placeholder='Select medical issues'
						menuItems={ [
							{ key: 'Tes 1', value: 'Tes 1' },
							{ key: 'Tes 2', value: 'Tes 2' },
							{ key: 'Tes 3', value: 'Tes 3' },
						] }
						onChange={ (event: { currentTarget: { value: any; }; }) => {
							// to get value from event, get it like below
							event.currentTarget.value;
						} }
					/>
				</div>
				<div>
					<Form.TextField
						label='Preferred Day'
						placeholder='Choose preferred day'
						iconName='CalendarIcon'
						iconPosition='left'
						errorMessage='Required'
						isError={ false }
					/>
				</div>
				<div>
					<Form.Dropdown
						label='Hospital'
						placeholder='Select hospital'
						menuItems={ [
							{ key: 'Tes 1', value: 'Tes 1' },
							{ key: 'Tes 2', value: 'Tes 2' },
							{ key: 'Tes 3', value: 'Tes 3' },
						] }
						onChange={ (event: { currentTarget: { value: any; }; }) => {
							// to get value from event, get it like below
							event.currentTarget.value;
						} }
					/>
				</div>
				<div>
					<Form.Dropdown
						label='Gender'
						placeholder='Select gender'
						menuItems={ [
							{ key: 'Tes 1', value: 'Tes 1' },
							{ key: 'Tes 2', value: 'Tes 2' },
							{ key: 'Tes 3', value: 'Tes 3' },
						] }
						onChange={ (event: { currentTarget: { value: any; }; }) => {
							// to get value from event, get it like below
							event.currentTarget.value;
						} }
					/>
				</div>
				<div>
					<Form.TextField
						label='Age'
						placeholder='Type your age'
						errorMessage='Required'
						isError={ false }
					/>
				</div>
			</div>
			<div className='flex flex-1 gap-4 mt-8 justify-end'>
				<Button className='shrink-0 max-w-[121px]' theme='outline' $hoverTheme='primary'>Reset</Button>
				<Button className='shrink-0 max-w-[216px]' theme='primary'>Book Appointment</Button>
			</div>
		</div>
	);
};

export default BookByIssues;