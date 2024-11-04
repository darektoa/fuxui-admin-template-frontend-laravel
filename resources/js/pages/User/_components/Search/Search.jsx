import './style.css';
import { useSearchParams } from 'react-router-dom';
import React, { useMemo } from 'react';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import Str from '@/utilities/StringHelper';

function Search(props) {
    const { className } = props;
    const [searchParams, setSearchParams] = useSearchParams(
        new URLSearchParams({
            search: '',
        }),
    );

    const search = useMemo(() => searchParams.get('search'), [searchParams]);

    const searchChangeHandle = (e) => {
        searchParams.set('search', e.target.value);
        setSearchParams(searchParams);
    };

    const reloadHandle = (e) => {
        e.preventDefault();
        window.location.reload();
    };

    return (
        <form
            className={Str.joinClassName('affiliator-request-component-search', className)}
            onSubmit={reloadHandle}
        >
            <input
                className="mr-2 grow rounded-lg border border-gray-200 px-2"
                type="text"
                placeholder="Search here . . ."
                value={search}
                onChange={searchChangeHandle}
            />
            <Button
                type="submit"
                className="border border-gray-200 bg-white p-2 shadow-none"
            >
                <Icon.Search className="h-5 w-5" />
            </Button>
        </form>
    );
}

export default Search;
